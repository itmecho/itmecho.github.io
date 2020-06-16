.PHONY: dev build

dev:
	zola serve -o docs

build:
	zola build -o docs
