+++
title = "Set defaults for environment variables"
+++

If you're writing a script, sometimes it can be helpful to set a default for a variable. If the variable is optional, this can often remove the need to check if a variable is set before using it and also help keep your output nicely formatted and easy to read. The following script will have different outputs based upon the environment variables we set:

```sh
#!/bin/bash

# Variable with a default
# This will be overwridden even when it is set to an empty string
echo "with_default: '${with_default-default}'"

# Variable with a strict default
# This will be overwridden unless it is set to an empty string
echo "with_strict_default: '${with_strict_default:-default}'"

# Variable without a default
echo "no_default: '${no_default}'"
```

Running this script without setting any of the variables will give the following output:

```sh
$ ./default-envs
with_default: 'default'
with_strict_default: 'default'
no_default: ''
```

We can override those variables by setting them before running the script or, like in this example, at runtime:

```sh
$ with_default=test1 \
	with_strict_default=test2 \
	no_default=test3 \
	./default-envs
with_default: 'test1'
with_strict_default: 'test2'
no_default: 'test3'
```

Here you can see that all 3 variables were overridden. Now lets try the same thing but set the variables to empty strings:

```
$ with_default="" \
	with_strict_default="" \
	no_default="" \
	./default-envs
with_default: ''
with_strict_default: 'default'
no_default: ''
```

The first and last variables were overridden but the second variable used the default value. This is due to the strict mode which ignores the variable passed in if it was set to an empty string.
