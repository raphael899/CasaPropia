upstream vtsion {
    ip_hash;
    server 198.251.72.141:3000 weight=5;
}
server {
    listen 443 ssl;
    server_name addapptech.com;
    ssl on;
    ssl_certificate     /etc/ssl/certs/addapptech.com_ssl_certificate.cer;
    ssl_certificate_key /etc/ssl/private/_.addapptech.com_private_key.key;
    ssl_session_timeout 5m;
    ssl_protocols SSLv3 TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers "HIGH:!aNULL:!MD5 or HIGH:!aNULL:!MD5:!3DES";
    ssl_prefer_server_ciphers on;
    location / {
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_http_version 1.1;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $host;
        proxy_pass http://vtsion;
    }
    location /wppvisiontecno {
        proxy_pass http://198.251.72.141:3000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

