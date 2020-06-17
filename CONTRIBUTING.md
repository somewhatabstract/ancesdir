# Contributing to `ancesdir`

🙇Thank you for your interest in contributing to this tiny little 📦.

Whether raising an issue, reviewing a pull request, or implementing a change, the participation of others is a wonderful 🎁. Read on to find out how you can get involved.

📖 Be sure to read our [Code of Conduct](https://github.com/somewhatabstract/ancesdir/blob/main/CODE_OF_CONDUCT.md).

## 🛑 Bugs And Feature Requests

If you find a bug or want to make enhancements to the project, head on over to the [🔗Issues](https://github.com/somewhatabstract/ancesdir/issues) section and raise an issue. The issue templates will guide you in providing details that will help others help you.

## 💻 Code Changes

### ⓵ Making your first change

Look for bugs or feature requests with the [good first issue](https://github.com/somewhatabstract/ancesdir/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22) or [help wanted](https://github.com/somewhatabstract/ancesdir/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22+) labels and have a go at implementing a change. Once your change is ready, you can submit a pull request.

### 🎬 Getting Started

To work in the `ancesdir` repository, follow these steps:

1. Clone the repository
   `git clone git@github.com:somewhatabstract/ancesdir.git`
2. Install `yarn` (see [🔗yarnpkg.com](https://yarnpkg.com))
3. Run `yarn install` to install the dependencies

You can now work on `ancesdir`. We prefer [🔗Visual Studio Code](https://code.visualstudio.com/) as our development environment (it's cross-platform and awesome), but please use what you feel comfortable with (we'll even forgive you for using vim).

### 🧪 Code Quality

#### Manual

We love code reviews. If there are open pull requests, please feel free to review them and provide feedback. Feedback is a gift and code reviews are often a bottleneck in getting new things released. Jump in, even if you don't know anything; you probably know more than you think.

💭**REMEMBER** Be kind and considerate. Folks are volunteering their time and code reviews are a moment of vulnerability where a criticism of the code can easily become a criticism of the individual that wrote it.

1. Take your time
2. Consider how you might receive the feedback you are giving if it were attached to code you wrote
3. Favor asking questions over prescribing solutions.

#### Automated

To ensure code quality, we use prettier, flow, eslint, and jest. These are all executed on commit, so don't worry if you forget to run them before you commit. They are also executed when you submit a pull request to ensure the contribution meets our code quality standard.

To execute these operations outside of a pull request or commit operation, you can use `yarn`.

- `yarn flow`
- `yarn lint`
- `yarn test`

💭**REMEMBER** If you would like to contribute code changes to the project, first make sure there's a corresponding issue for the change you wish to make.

## 📦 Build And Publish

Anyone can create a local build of the distributed code by running `yarn build`. After the build is executed, a stats page will open in your browser of choice showing the distributed package breakdown. This can be helpful in identifying code bloat issues, as can the rollup output in the command line.

Running the build will execute tests first.

### Publishing

Publishing an updated package is reserved for those with appropriate credentials. Coordinate with the repository owners to get your changes into a published release. The steps for publishing are:

1. Ensure all PRs are reviewed and merged to `main`
1. Wait for all testing to pass (if it does not, we have a problem)
1. Locally:
    1. `git checkout main && git pull`
    1. Edit the `package.json` to update the package version
    1. Commit the changes to `package.json` and push them
    1. `git tag vX.Y.Z` where X is the major version from the `package.json`, Y is the minor version, and Z is the patch version
    1. `git push --tags`
    1. `yarn install`
    1. `yarn build` (if tests fail, stop!)
    1. `npm publish`
1. Create a release on github with some notes on what the release contains and a link to the NPM package
