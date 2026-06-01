# ============================================================================
# Laravel Base Image — Runtime Environment Only
# ============================================================================
# Contains: FrankenPHP (PHP 8.4) + system deps + PHP extensions + config.
# Does NOT contain application code, vendor, or compiled assets.
#
# Build & push:
#   docker build -f Dockerfile.base -t nexudev/laravel-octane-frankenphp:base .
#   docker push nexudev/laravel-octane-frankenphp:base
#
# Rebuild only when:
#   - Adding/removing PHP extensions
#   - Upgrading PHP version
#   - Changing system packages
#   - Modifying PHP/OPcache configuration
# ============================================================================
FROM dunglas/frankenphp:1-php8.4-bookworm

LABEL maintainer="NexuDev Team"
LABEL description="NexuDev Laravel Octane FrankenPHP Base — FrankenPHP 8.4 runtime with extensions"

# ─── System dependencies + PHP extensions ────────────────────────────
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        supervisor \
        curl \
        libpq-dev \
        libpng-dev \
        libjpeg62-turbo-dev \
        libfreetype6-dev \
        libwebp-dev \
        libicu-dev \
        libzip-dev \
    && docker-php-ext-configure gd \
        --with-freetype \
        --with-jpeg \
        --with-webp \
    && docker-php-ext-install -j$(nproc) \
        pdo_pgsql \
        pgsql \
        pdo_mysql \
        pcntl \
        intl \
        gd \
        zip \
        bcmath \
        opcache \
        sockets \
        exif \
    && pecl install redis \
    && docker-php-ext-enable redis \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# ─── PHP production configuration ────────────────────────────────────
RUN cp "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"

# OPcache tuning for Octane (preload-friendly, JIT enabled)
RUN { \
    echo 'opcache.enable=1'; \
    echo 'opcache.memory_consumption=256'; \
    echo 'opcache.interned_strings_buffer=64'; \
    echo 'opcache.max_accelerated_files=32531'; \
    echo 'opcache.validate_timestamps=0'; \
    echo 'opcache.save_comments=1'; \
    echo 'opcache.jit=1255'; \
    echo 'opcache.jit_buffer_size=128M'; \
    } > "$PHP_INI_DIR/conf.d/opcache.ini"

# PHP memory & upload limits
RUN { \
    echo 'memory_limit=256M'; \
    echo 'upload_max_filesize=64M'; \
    echo 'post_max_size=64M'; \
    echo 'max_execution_time=60'; \
    echo 'max_input_vars=5000'; \
    echo 'realpath_cache_size=4096K'; \
    echo 'realpath_cache_ttl=600'; \
    } > "$PHP_INI_DIR/conf.d/app.ini"

# ─── Default workdir for app images ──────────────────────────────────
WORKDIR /var/www/html