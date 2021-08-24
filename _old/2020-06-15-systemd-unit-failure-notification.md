+++
title = "Systemd unit failure notification"
+++

In this post, we will be configuring a systemd unit which will send a notification to a slack channel when a systemd unit enters the failed state. This is achieved using the [`OnFailure`](https://www.freedesktop.org/software/systemd/man/systemd.unit.html#OnFailure=) setting in the `Unit` section.

## The alerting script
We start off by creating a script which will be run by the systemd unit. This script takes one argument, the name of the unit that failed and sends a formatted message to a slack webhook.

```bash
#!/bin/bash

# Set your slack webhook url here
SLACK_WEBHOOK_URL=""

unit=$1

read -d '' payload << EOF
{
    "icon_emoji": ":fire:",
    "username": "alertbot",
    "attachments": [
        {
            "fallback": "Systemd: ${unit} failed to start",
            "color": "danger",
            "title": "Systemd: ${unit} failed to start",
            "text": "The ${unit} systemd unit failed to start!"
        }
    ]
}
EOF

curl \
        --silent \
        --output /dev/null \
        -X POST \
        -H 'Content-Type: application/json' \
        --data "${payload}" $SLACK_WEBHOOK_URL
```

Once you've set the `SLACK_WEBHOOK_URL` variable, feel free to test the script using the following command:
```sh
/usr/local/bin/systemd-alert test
```

**NOTE:** Don't forget to make the script executable using `chmod 700 /usr/local/bin/systemd-alert`

You should see an alert in your configured slack channel with the message:
> Systemd: test failed to start

## The systemd alerting unit
Next up we're creating a systemd unit that will be started when another unit fails. Create the file `/lib/systemd/system/systemd-alert@.service` with the content:

```ini
[Unit]
Description=Systemd alert

[Service]
Type=oneshot
ExecStart=/usr/local/bin/systemd-alert %i
Restart=never
```

This is a super simple unit which will just execute the script `/usr/local/bin/systemd-alert`, passing the instance name as an argument. The instance name is defined when we start the unit by adding it after the `@` symbol in the service file name.

**Example**: `sudo systemctl start systemd-alert@test.service` will execute `/usr/local/bin/systemd-alert test`

## Triggering the alert
Finally, we just need to add the `OnFailure` setting to the `Unit` section of another systemd unit we want to be alerted for. Once that unit enters the `failed` state, systemd will start the unit specified by `OnFailure`, sending the alert notification.

```ini
[Unit]
...
OnFailure=systemd-alert@nginx.service

[Service]
...
```

With that done, we should be good to go! You can test it out by making sure your unit will fail (maybe make a typo in the `ExecStart` command) and starting it.

This is very useful for dynamic environments such as applications running on AWS Spot Instances as you will recieve an alert if your server fails to start a critical service which could otherwise go unnoticed. In an upcoming blog post, I will be talking about how to use a tool named [`germinate`](https://github.com/itmecho/germinate) to enrich the alert message with data from other sources at runtime. For example, loading the value of an AWS EC2 instance tag to get more context.
