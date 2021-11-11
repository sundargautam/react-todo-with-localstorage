export const Todoupdatemodal = ({ handleUpdate, setupdatedText }) => {
  return (
    <form className="todo-update-modal" onSubmit={handleUpdate}>
      <input type="text" className="todo-update-input" onChange={(e) => setupdatedText(e.target.value)} />
      <button className="todo-update-submit" type="submit">Update</button>
    </form>
  );
};
