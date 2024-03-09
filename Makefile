compile:
	npm install 
	npm install --prefix client
	npm run build --prefix client
	rm -rf ./public && mkdir ./public
	cp -r client/dist/* ./public