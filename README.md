Notes from Ali:

1) Create a .env file similar to this

```
DATABASE_NAME=vsr
DATABASE_USER=postgres
DATABASE_PASSWORD=changeme
DATABASE_HOST=localhost
DATABASE_PORT=5432
SPACES_KEY=foo
SPACES_SECRET=foo

```

place this at backend/videoservice/.env

2) Create a .vscode folder and add the following
do this first:

```
pip3 install black flake8
```

then

```
// .vscode/settings.json
{
    "python.pythonPath": "/home/ali/anaconda3/envs/deeplearning/bin/python",
    "python.terminal.activateEnvironment": true,
    "python.linting.enabled": true,
    "python.linting.flake8Enabled": true,
    "python.linting.pylintEnabled": false,
    "editor.formatOnSave": true,
    "python.formatting.provider": "black"
}
```
For formatting and linting, 3shan el code yefdal nedif

3) For formatting the entire directory 3shan el spacing wel nadafa:
```
black .
```
