# Contributing

You want to contribute to the project? Awesome!

## Things to know

By contributing to this repository, you are expected to know and follow the rules of laid out in our [Code of Conduct][coc].

**Working on your first Pull Request?**
[How to Contribute to an Open Source Project on GitHub][egghead]





## How do

* Project setup?
	[We've got you covered!](#project-setup)

* Found a bug?
	[Let us know!][bugs]

* Want a new feature?
	[Hook us up with the deets!][feature-request]

* Patched a bug?
	[Make a PR!][new-pr]

* Adding examples for a new lib?
	[EZPZ](#adding-a-new-library)





## Project setup

<!-- 1. Install Yarn v2 (if you haven't already). Instructions can be found [here][yarn2install]! -->
1. Fork and clone the repo
1. Run `yarn install` to install Node dependencies
1. Run `yarn start` to start up the dev server
1. Create a branch for your PR

**NOTE:** Use of NPM is **NOT** supported by this repository.

> Tip: Keep your `develop` branch pointing at the original repository and make
> pull requests from branches on your fork. To do this, run:
>
> ```
> git remote add upstream https://github.com/fdgt-apis/website.git
> git fetch upstream
> git branch --set-upstream-to=upstream/develop develop
> ```
>
> This will add the original repository as a "remote" called "upstream,"
> Then fetch the git information from that remote, then set your local `develop`
> branch to use the upstream develop branch whenever you run `git pull`.
> Then you can make all of your pull request branches based on this `develop`
> branch. Whenever you want to update your version of `develop`, do a regular
> `git pull`.





## Adding a New Library

Adding library examples is a great way to make `fdgt` more accessible to more people! If you want to add examples for a new library, here are the steps:

1. Create a new directory in `/docs/code-templates` named after the library, e.g. `tmi.js`, `TwitchLib`, and `Twirk`.
1. Create two examples for using the library to connect to Twitch chat.
	1. The first example should be named `NormalConnect.md`. This will show how to use the library to connect to Twitch normally, i.e. not connecting to `fdgt`.
	1. The second example should be named `FDGTConnect.md`. This will show how to use the library to connect to `fdgt` *instead of* Twitch. It should be as simple as passing a connection URL to the library.
1. Create an example for sending a message with the library. All commands are sent to `fdgt` as messages, so this one example will cover *all* of the command docs.

### Other notes

* Capitalization and whitespace are both important in the library's directory name, as this is *exactly* how it will show up in examples.
* All of the examples are written with Markdown. It's important that your example be wrapped in a Markdown code block with the language declared, e.g.:

	```js
	client.say('#channel', 'beep boop')
	```

* If the language for your library isn't currently supported (you'll know if you don't have any syntax highlighting), you can add it to our [.babelrc file][.babelrc].





## Being added as a contributor

When you create your first PR we will add you as a contributor as per [All Contributors][all-contributors] convention.
If you have made a bug report, you will be added along with the PR that fixes the bug. (Assuming you have a GitHub account!)

If you do not wish to be added, please let us know.

### Commit conventions

We use an interpretation of the angular commit conventions in this project. Generally speaking, all commits should follow this pattern:
```
type(component): commit message
```
* **type** - The type of work done in the commit. See below for types.
* **component** - Should follow these rules:
	* If the file is a react component (in the `components/` directory), no suffix is needed. Just use the file name.
	* If the file is a helper file (in the helpers directory), use `helpers` as the component.
	* If the file is documentation, no suffix is needed, however docs should **ALWAYS** have a commit type of `docs`.
	* Remain as consistent in naming as possible. Use git history as precedence for the component name given to a file.
* **commit message** - should quickly summarize changes made. If there are multiple changes, multiline commit messages are allowed to fully summarize changes made.

If in doubt about component naming, try to dive into the commit history for the file in question. Ultimately ask if you're still confused. Use your best judgement, but prefer consistency over enforcing the rules set by this document. the point of these rules is to make searching through commits easier, and consistency helps the most.

Commits should be as samll as possible, with exceptions for large sweeping changes required by lint rule changes, package updates, etc.

If the commit **must** make changes to two or more **completely unrelated** files, the component name and parentheses are not required.

### Commit types
* `feat` - New feature.
* `fix` - Bug fix.
* `refactor` - A change in behavior of existing code.
* `docs` - A change in project documentation.
* `style` - Fixes which **only** fix code style and not behavior.
* `chore` - Maintenance tasks such as updating dependencies.





[all-contributors]: https://github.com/kentcdodds/all-contributors
[bugs]: https://github.com/fdgt-apis/website/issues/new?assignees=&labels=bug&template=bug_report.md&title=
[coc]: CODE_OF_CONDUCT.md
[feature-request]: https://github.com/fdgt-apis/website/issues/new?assignees=&labels=enhancement&template=feature_request.md&title=
[egghead]: https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github
[new-pr]: https://github.com/fdgt-apis/website/compare
[.babelrc]: https://github.com/fdgt-apis/website/blob/main/.babelrc
[yarn2install]: https://yarnpkg.com/getting-started
