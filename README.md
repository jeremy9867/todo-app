# todo-app

A simple to-do list that runs in the browser, written in plain HTML, CSS and JavaScript with no frameworks, dependencies or build step.

## Features

- **Add tasks**: type in the box and press Enter or click **Add**.
- **Mark tasks as done**: tick the checkbox (or click the task text). Done tasks are struck through, and you can untick them again.
- **Delete tasks**: click the **✕** next to a task.
- **Saved automatically**: tasks are stored in your browser's `localStorage`, so they are still there after you refresh or reopen the page.

A counter at the bottom shows how many tasks are left to do. The layout works on phones, and it follows your system's light or dark theme.

## Running it

Open `index.html` in any modern browser. That's all you need.

If you'd rather serve it locally, any static file server works, for example:

```bash
python3 -m http.server 8000
```

Then visit http://localhost:8000.

## Files

| File         | Purpose                                                   |
| ------------ | --------------------------------------------------------- |
| `index.html` | Page structure: the input form and the task list          |
| `style.css`  | Styling, including dark mode and a mobile-friendly layout |
| `app.js`     | Adding, ticking and deleting tasks, and saving them       |

## Notes

- Tasks are saved under the `localStorage` key `todo-app.tasks`. They belong to that browser on that device only, and clearing your site data removes them.
- If `localStorage` is unavailable (for example in some private-browsing modes), the app still works but tasks won't survive a refresh.
