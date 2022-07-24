rescript:
	npm run-script re:build
webpack:
	npx webpack
build:
	make rescript && npx webpack
server:
	python3 -m http.server
clean:
	rm ./out/*.js