rescript:
	npm run build
build:
	npm run build && npm run bundle
server:
	python3 -m http.server
clean:
	rm ./out/*.js