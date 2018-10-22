BIN=$(shell pwd)/node_modules/.bin
S=$(shell jq '.server' config.json)
P=$(shell jq '.path' config.json)
C=$(shell echo "$S:$P/")

develop:
	@clear
	@$(MAKE) install
	@$(BIN)/gatsby develop

install:
	@npm install

build:
	@$(BIN)/gatsby build

deploy:
	@$(MAKE) build
	@cd public && rm *.map
	@cd public && tar -cvf build.tar.gz *
	@scp public/build.tar.gz $C
	@ssh $S "cd $P && tar -xvf build.tar.gz"