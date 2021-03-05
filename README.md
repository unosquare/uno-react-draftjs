# uno-react-draftjs

A tool to create rich-text fields with draftjs and easely store it using markdown format.

## Gettin Started

The uno-react-draftjs package exports three objects: The UnoReactDrafjs component, RichEditorProps interface and RichTextEditorRef type.
```tsx
  import { UnoReactDraftjs, RichTextEditorRef, RichTextEditorProps } from 'uno-react-draftjs';
```
The UnoReactDraftjs component uses the state of it's father to store the markdown formatted string that reprecents the current state of the draftjs element.

```tsx
  const [markdownString, setMarkdownSting] = useState(initialMarkdownString);
  
  return (
    <UnoReactDraftjs markdown={markdownString} setMark={setMarkdownSting} placeholder={''} />
  )
```
## Data Flow

UnoReactDraftjs manages two states. The markdown string passed by it's father and an EditorState that the component uses to refresh the UI. The communication between these two states is unidirectional most of the time. This means that when the EditoState from UnoReactDraftjs changes it's value the markdown string updates as well, but the same doesn´t happen the other way around.

If you need to update the UI state from the UnoReactDraftj's father you must implement a **RichTextEditorRef** and call it's **setText** method.

```tsx
  const draftRef = useRef<RichTextEditorRef>();
  
  return (
    <>
      <UnoReactDraftjs markdown={markdownString} setMark={setMarkdownSting} placeholder={''} ref={draftRef} />
      <button
        onClick={() => {
            draftRef.current.setText(newMarkdownString);
        }}
      >
    </>
  )
```