# Quick Reference
- **Language**: Svelte and SvelteKit
- **Style**: Functional programming preferred
- **Indentation**: 2 spaces
- **Line length**: 80 characters max

# Code Style & Standards

## General
- Prioritize clean, readable, and maintainable code
- Favor a functional programming style
- Use modern JavaScript features like arrow functions, destructuring, and template literals
- Avoid mutating values or reassigning variables

## Language & Formatting
- Always indent with 2 spaces
- Always use semicolons at the end of statements
- Always include brackets for control structures (`if`, `for`, `while`, etc.)
- Always use trailing commas in arrays and objects
- Always use array and object literals
- Prefer array helpers (`forEach`, `map`, `filter`, or `reduce`)
  - Avoid using `for` or `for in` loops, to avoid reference errors
- Always start `else` blocks on their own line
- Always start `catch` blocks on their own line
- Always use `catch (err)` for error handling
- Use `const` for all variables that should not be reassigned, and `let` for any that need to be reassigned
  - Avoid `var` where possible
- Use single quotes unless the string contains a single quote
- Avoid exceeding 80 characters per line
- Aim to keep all functions small, approximately under 40 lines
- Add custom fields/records (any variable string starting with `cust`) to the `config.json` as constants, or a constants file
- Use template literals for multi-line strings
- Use ternary operators inside object literals when object properties should remain consistent
  - Good: `const config = { mode: isEnabled ? 'on' : 'off', status: 'active' };`
  - When properties vary by condition, build the object conditionally instead
- Break ternary operators after the `?` and `:`
  - Good:
  ```javascript
  const variable = condition ?
    option1 :
    option2;
  ```
- Try to keep statements on a single line when possible for simple `if` statements
  - Single `if` example:
  ```javascript
  if (condition) { doSomething(); }
  ```
  - `if`/`else` example:
  ```javascript
  if (condition) {
    doSomething();
  }
  else {
    doSomethingElse();
  }
  ```
- Avoid vertical alignment for object properties and variable declarations
  - It creates maintenance conflicts with auto-formatters and extra noise in diffs
  - Use consistent indentation without extra spacing
  - Good:
  ```javascript
  const obj = {
    id: valueId,
    property_one: valueOne,
    property_two: valueTwo,
    property_three: valueThree,
  };
  ```
  - Avoid:
  ```javascript
  const obj = {
    id:             valueId,
    property_one:   valueOne,
    property_two:   valueTwo,
    property_three: valueThree,
  };
  ```

## Naming Conventions
- Variable names: `camelCase`
- Object property names: `snake_case`
- True Constants: `UPPER_SNAKE_CASE`
- Files: `snake_case`
- Folders/Directories: `kebab-case`
- Enums: `PascalCase`
- Enum options: `UPPER_SNAKE_CASE`

## Destructuring
- Destructure function parameters when using multiple properties and not exceeding the 80 character limit
- Good: `function process({ customer_id, order_id }) { ... }`
- Avoid: `function process(params) { const customerId = params.customer_id; ... }`

## Error Handling
- Do not use try/catch blocks for explicit control flow
- Catch errors only at the level where they terminate all subsequent execution
- Allow errors to bubble up to the highest recoverable point
- Examples:
  - If a model error prevents all further execution → catch at entry point
  - If a controller can handle an error (e.g., send notification, try alternate path) → catch at controller
  - Use try/catch only for unexpected errors, not conditional logic

# Testing

## Test Guidelines
- Use Vitest for unit testing
- Use Playwright for end-to-end testing
- Write tests that are deterministic and do not rely on external state

## Coverage
- Write new tests for any new code, and update existing tests when modifying code

## Test Structure
- Name unit tests mirroring the module: `*.test.js`