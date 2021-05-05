Notes from Ali:

# Environemnt variables

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

---
# VScode lina kolena

2) Create a .vscode folder and add the following
do this first:

```
pip3 install black pylint pylint-django
```

then

```
// .vscode/settings.json
{
    "python.pythonPath": "./venv/bin/python",
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
        "source.organizeImports": true
    },
    "python.terminal.activateEnvironment": true,
    "python.linting.enabled": true,
    "python.linting.pylintPath": "pylint",
    "python.linting.pylintEnabled": true,
    "python.linting.pylintUseMinimalCheckers": false,
    "python.linting.lintOnSave": true,
    "python.linting.pylintArgs": [
        "--disable=C0111", // missing docstring
        "--django-settings-module=videoservice.settings",
        "--load-plugins",
        "pylint_django",
    ],
    "python.formatting.provider": "black",
}
```
For formatting and linting, 3shan el code yefdal nedif

---

# Nadafa sahla
3) For formatting the entire directory 3shan el spacing wel nadafa:
```
black .
```
---

# Debugging Django in vscode

// .vscode/launch.json

```
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Python: Django",
            "type": "python",
            "request": "launch",
            "program": "${workspaceFolder}/backend/manage.py",
            "args": [
                "runserver"
            ],
            "django": true
        }
    ]
}
```