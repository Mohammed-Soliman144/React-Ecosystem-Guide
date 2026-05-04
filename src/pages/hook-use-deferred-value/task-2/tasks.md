Here are 4 mini-tasks designed to test your mastery of useDeferredValue in scenarios commonly found in professional production environments.
## Task 1: The "Janky" Data Grid => Done
The Market Issue: You are building a financial dashboard with a massive Data Grid (50+ columns, hundreds of rows). The user has a global "Filter" input at the top. When they type, the input "stutters" because the Grid is trying to re-render all its complex cells and calculations on every keystroke.

* The Requirement: Ensure the input field remains butter-smooth (60fps) while the Data Grid only updates its rows when the browser has idle time.
* The Constraint: You are not allowed to use useTransition or debounce because the search input is a shared component used in many places that you cannot modify.

## Task 2: The "Ghost" Chart Overlay
The Market Issue: You have a real-time Stock Chart component. On top of this chart, you have a "Crosshair" (a vertical line) that follows the user's mouse to show prices at specific timeframes. The chart itself is extremely heavy to re-draw.

* The Requirement: The mouse-following line must move instantly without lag. However, the data tooltip (which fetches and calculates complex technical indicators based on that mouse position) should be allowed to lag slightly behind the mouse line.
* The Constraint: Use the hook to ensure the "heavy" calculations don't block the visual movement of the crosshair.

## Task 3: The "Stale-While-Revalidating" List => Done
The Market Issue: In a "Product Search" page, when a user changes a filter, the list usually goes blank or shows a spinner while the new results load. UX research shows users hate "flashing" blank screens.

* The Requirement: When the user changes a search term, the previous results should stay visible (but perhaps look slightly faded) while the new results are being computed in the background.
* The Constraint: Once the new results are ready, the UI must switch to them immediately without any "snap" or intermediate loading state.

## Task 4: The "Third-Party Prop" Bottleneck
The Market Issue: You are using a third-party library for a Code Editor (like Monaco or CodeMirror). This library is passed a theme object as a prop. Every time the user toggles the "Theme" (Dark/Light), the editor freezes for 300ms to re-parse the CSS of the code.

* The Requirement: The rest of your app (the sidebar, the icons, the navigation) should switch themes instantly. The code editor should be the only thing that lags behind during the theme switch.
* The Constraint: You cannot wrap the theme-toggle button in useTransition because the theme state is managed by a Global Provider (Context API) that handles many other fast-priority tasks.

------------------------------
## How to know if you've "Mastered" it:

   1. Can you explain why you would use this instead of a setTimeout or Lodash.debounce?
   2. Did you remember to use React.memo on the components receiving the deferred value? (If not, the performance gain is usually zero).
   3. Are you able to identify the difference between a "Transition" and a "Deferred Value" during a mock interview?

Which one of these scenarios feels the most challenging to you? If you're ready, we can dive into the logic for Task 1!



Error: Calling setState synchronously within an effect can trigger cascading renders

Effects are intended to synchronize state between React and external systems such as manually updating the DOM, state management libraries, or other platform APIs. In general, the body of an effect should do one or both of the following:
* Update external systems with the latest state from React.
* Subscribe for updates from some external system, calling setState in a callback function when external state changes.

Calling setState synchronously within an effect body causes cascading renders that can hurt performance, and is not recommended. (https://react.dev/learn/you-might-not-need-an-effect).




| Feature  | useDeferredValue | useTransition        |
| -------- | ---------------- | -------------------- |
| Works on | value            | state update         |
| Control  | automatic        | manual               |
| Use case | derived data     | UI transitions       |
| Returns  | deferred value   | isPending + function |
| Example  | search filtering | page navigation      |

SWR => Stale While Revalidating (during or after HTTP Request => old data)
useOptimistic => (before send HTTP Request => fake data)