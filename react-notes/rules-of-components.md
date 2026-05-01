# Rules of Components:
1. **Reusability:** if a piece of ui (chunk) is repeated in many different places in your app so make it as component. (separate it in component).
2. **Readability:** if there a section of ui has many and many lines of codes which make its hard to read so divided the section in many component and each component do one task. (divide section of many lines of code in many component and each one do one task to make it easy to read).
3. **State Logic:** if there is a part of ui has state logic (simple states or complexed states) although this part in repeated or not repeated so separate this part in component to left state in single one place and separate logic from ui.
4. if(resuability || readability || stateLogic) makeInComponent;