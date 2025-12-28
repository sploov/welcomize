# Contributing to Welcomize

First off, thanks for taking the time to contribute! 🎉

The following is a set of guidelines for contributing to Welcomize. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## Code of Conduct

This project and everyone participating in it is governed by the [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## Getting Started

1.  **Fork the repository** on GitHub.
2.  **Clone your fork** locally:
    ```bash
    git clone https://github.com/your-username/welcomize.git
    cd welcomize
    ```
3.  **Install dependencies**:
    ```bash
    npm install
    ```
4.  **Create a branch** for your feature or fix:
    ```bash
    git checkout -b feature/amazing-feature
    ```

## Development Workflow

1.  **Make your changes**.
2.  **Run the build** to ensure everything compiles:
    ```bash
    npm run build
    ```
3.  **Test your changes** by generating examples:
    ```bash
    npx ts-node examples/generate.ts
    ```
    Check the `examples/output` directory to verify the visual results.

## Commit Guidelines

We generally follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.

- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `chore:` for build/tooling changes

Example: `feat: add new futuristic theme`

## Submitting a Pull Request

1.  **Push your branch** to GitHub:
    ```bash
    git push origin feature/amazing-feature
    ```
2.  Open a **Pull Request** on the main `welcomize` repository.
3.  Fill out the **Pull Request** Template completely.
4.  Wait for review! We try to review PRs as quickly as possible.

## Coding Standards

- Write clean, readable **TypeScript**.
- Ensure all types are properly defined (avoid `any` where possible).
- Follow the existing project structure and naming conventions.

Thank you for your contributions!
