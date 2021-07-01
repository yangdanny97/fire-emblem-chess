rescript:
	npm run-script re:build
webpack:
	npx webpack
build:
	make rescript && npx webpack
clean:
	rm ./out/*.js