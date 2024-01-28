export const generatePlaceholderCard = (column) => {
  return {
    _id: `${column._id}-placeholder-card`,
    boardId: column.boardId,
    columnId: column._id, // Corrected this line
    FE_PlaceholderCard: true
  }
}
