---
layout: single
date: Last Modified
title: Speech - MathLive Guide
permalink: /mathlive/guides/speech/
read_time: false
sidebar:
    - nav: "mathlive"
head:
  stylesheets:
    - https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.48.0/codemirror.min.css
  scripts:
    - https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.48.0/codemirror.min.js
    - https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.48.0/mode/javascript/javascript.min.js
    - https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.48.0/mode/xml/xml.min.js
---
<script>
    moduleMap = {
        mathlive: "//unpkg.com/mathlive?module",
        "html-to-image": "///assets/js/html-to-image.js",
    };
</script>

# Speech

## Using Speech Output in MathLive

**To speak the formula or a portion of it**, use these keyboard shortcuts:

- **alt/⌥ + ctrl + ⇡**: speak the entire formula
- **alt/⌥ + ctrl + ⇣**: speak the selection

**To programatically trigger speech output**, use:

```js
mf.executeCommand('speak');
```

The command above will speak the entire formula. To speak a subset of the
formula use:

```js
mf.executeCommand(['speak', 'selection');
```
The options to specify the speech "scope" are:

<div class='symbols-table'>

| | |
|---:|:---|
| `all` | the entire formula |
| `selection` | the selection portion of the formula |
| `left` | the element to the left of the selection |
| `right` | the element to the right of the selection |
| `group` | the group (numerator, root, etc..) the selection is in |
| `parent` | the parent of the selection |

</div>

**To get a textual representation of a spoken description of the formula**, use
the `spoken-text` format:

```js
mf.getValue('spoken-text');
```

## Configuring Speech Options

There are two aspects that can be configured independently:

1. Speech Rules: the set of rules use to produce readable text from a math expression. 

2. Text-to-Speech engine: the software used to transform the readable text produced by the speech rules into sound. By default, the TTS engine provide by the operating system will be used, but MathLive can be configured to use the Amazon Cloud TTS engine as well.


### Speech Rules

A set of **speech rules** define how a math formula is transformed to speakable
text.

**To use the MathLive built-in speech rules**, set `textToSpeechRules` to `mathlive`.

Another set of speech rules supported are the SRE speech rules from Volker Sorge

**To use the SRE speech rules**:

1. Include the browser version of the SRE JavaScript file in your project. You can download it on [GitHub](https://github.com/zorkow/speech-rule-engine)
2. Set the `textToSpeechRules` configuration key to `'sre'`.

**To configure SRE**, set the `textToSpeechRulesOptions` configuration key. For example:

```javascript
textToSpeechRulesOptions: {
    domain: 'mathspeak', // 'mathspeak' or 'chromevox'
    ruleset: 'mathspeak-brief',   // 'mathspeak-default', 'mathspeak-brief', 'mathspeak-sbrief', 'chromevox-short', 'chromevox-default' or 'chromevox-alternative'
},
```

### Text-to-Speech Engine

#### Using the Local TTS Engine

**To use the local (built-in, OS specific) TTS engine**, set the `speechEngine` configuration key to `'local'`.

There is great variation between platforms (and browsers) on the quality of the TTS engine. However, it can be used even when offline, while the Amazon TTS engine offers higher quality and better consistency, but it does require a network connection.

#### Using Amazon Polly TTS Engine

1. Include the AWS SDK for JavaScript in your app. See [here for details](https://aws.amazon.com/sdk-for-browser/).
   This may be as simple as adding this:

```html
<head>
    <script src="https://sdk.amazonaws.com/js/aws-sdk-2.657.0.min.js"></script>
    <script>
        AWS.config.region = 'eu-west-1';
        AWS.config.accessKeyId = 'YOUR-KEY';
        AWS.config.secretAccessKey = 'YOUR-SECRET';
    </script>
</head>
```

See [npm](https://www.npmjs.com/package/aws-sdk) for the latest version.

2. To get the necessary keys, follow [these instructions](https://docs.aws.amazon.com/polly/latest/dg/setting-up.html)

    2.1 Create a custom policy in your [AWS console](https://console.aws.amazon.com/iam/home) with action: Read SynthesizeSpeech and a request condition of a referer with a StringEquals to your domain, e.g. 'https://example.com/*'

    2.2 Create a group, and associated it with the policy above

    2.3. Create a new user, for example the name of your app. Give it 'programmatic access' and associate it with the group above

    2.4 At the end of the creation, you will be provided by the access key and the secret access key.

Carefully consider how to handle the access and secret access keys. With the setup above they are somewhat restricted to a domain, however, they could be abused if accessed by an unauthorized user. To prevent this, you could require users to authenticate and use AWS Cognito.


#### Speech Output Format

**To configure the format of the speech output engine**, use the `textToSpeechMarkup` configuration option. Set it to:

-   `'ssml'` to request an output using the SSML markup language. Both SRE and the MathLive rules can produce this format.
-   `'mac'` to request an output using Mac OS speech markup, e.g. '[[slc 150]]'. This format can only be used on Mac OS (and may not work will all browsers). On platforms other than Mac OS, this option does nothing.
-   `''` (empty string) to request no markup.

The Amazon TTS engine supports SSML, and it is recommended to use this option for the highest quality.





{% readmore "/mathlive/guides/static/" %}
Next: Display <strong>Static Math</strong> formulas
{% endreadmore %}

