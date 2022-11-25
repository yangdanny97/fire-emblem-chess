rescript:
	npm run-script build
build:
	npm run-script build && npm run-script bundle
server:
	python3 -m http.server
clean:
	rm ./out/*.js