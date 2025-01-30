workers = 1
worker_class = 'sync'
threads = 1
timeout = 600
graceful_timeout = 120
keep_alive = 5

max_requests = 5
max_requests_jitter = 2 

limit_request_line = 4096
limit_request_fields = 100
limit_request_field_size = 8190

capture_output = True
enable_stdio_inheritance = True

accesslog = '-'
errorlog = '-'
loglevel = 'info'