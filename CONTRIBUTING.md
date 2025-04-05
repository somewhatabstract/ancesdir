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
2. Install `pnpm` using `corepack install`
3. Run `pnpm i` to install the dependencies

You can now work on `ancesdir`. We prefer [🔗Visual Studio Code](https://code.visualstudio.com/) as our development environment (it's cross-platform and awesome), but please use what you feel comfortable with (we'll even forgive you for using vim).

### 🧪 Code Quality

#### Manual

We love code reviews. If there are open pull requests, please feel free to review them and provide feedback. Feedback is a gift and code reviews are often a bottleneck in getting new things released. Jump in, even if you don't know anything; you probably know more than you think.

💭**REMEMBER** Be kind and considerate. Folks are volunteering their time and code reviews are a moment of vulnerability where a criticism of the code can easily become a criticism of the individual that wrote it.

1. Take your time
2. Consider how you might receive the feedback you are giving if it were attached to code you wrote
3. Favor asking questions over prescribing solutions.

#### Automated

To ensure code quality, we use prettier, static typing, eslint, and jest. These are all executed when you submit a pull request to ensure the contribution meets our code quality standard.

To execute these operations outside of a pull request or commit operation, you can use `pnpm`.

- `pnpm typecheck`
- `pnpm eslint` or `pnpm eslint --fix` to autofix what can be
- `pnpm test`

💭**REMEMBER** If you would like to contribute code changes to the project, first make sure there's a corresponding issue for the change you wish to make.

## 📦 Build And Publish

Anyone can create a local build of the distributed code by running `pnpm build`.

Running the build will execute tests first.

### Publishing

We use an automated release process. When a pull-request is accepted to `main`, a new release pull-request is created. This pull-request will contain the changes from the pull-request merged to `main` and will bump the version number of the package. Once the release pull-request is merged, the package will be published to NPM.
