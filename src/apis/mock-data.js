export const mockData = {
  board: {
    _id: 'board-id-01',
    title: 'TuanKietDev MERN Stack Board',
    description: 'Pro MERN stack Course',
    type: 'public Card', // 'private'
    ownerIds: [], // Những users là Admin của board
    memberIds: [], // Những users là member bình thường của board
    columnOrderIds: ['column-id-01', 'column-id-02', 'column-id-03', 'column-id-04'], // Thứ tự sắp xếp / vị trí của các Columns trong 1 boards
    columns: [
      {
        _id: 'column-id-01',
        boardId: 'board-id-01',
        title: 'To Do Column 01',
        cardOrderIds: ['card-id-01', 'card-id-02', 'card-id-03', 'card-id-04', 'card-id-05', 'card-id-06', 'card-id-07'],
        cards: [
          {
            _id: 'card-id-01',
            boardId: 'board-id-01',
            columnId: 'column-id-01',
            title: 'Title of card 01',
            description: 'Markdown Syntax (sẽ ở khóa nâng cao nhé)',
            cover: 'https://t4.ftcdn.net/jpg/02/97/79/83/360_F_297798377_VB9egqGnRKcZxU53wybEHLRnnTrcvlAH.jpg',
            memberIds: ['test-user-id-01'],
            comments: ['test comment 01', 'test comment 02'],
            attachments: ['test attachment 01', 'test attachment 02', 'test attachment 03']
          },
          { _id: 'card-id-02', boardId: 'board-id-01', columnId: 'column-id-01', title: 'Title of card 02', description: null, cover: null, memberIds: [], comments: [], attachments: [] },
          { _id: 'card-id-03', boardId: 'board-id-01', columnId: 'column-id-01', title: 'Title of card 03', description: null, cover: null, memberIds: [], comments: [], attachments: [] },
          { _id: 'card-id-04', boardId: 'board-id-01', columnId: 'column-id-01', title: 'Title of card 04', description: null, cover: null, memberIds: [], comments: [], attachments: [] },
          { _id: 'card-id-05', boardId: 'board-id-01', columnId: 'column-id-01', title: 'Title of card 05', description: null, cover: null, memberIds: [], comments: [], attachments: [] },
          { _id: 'card-id-06', boardId: 'board-id-01', columnId: 'column-id-01', title: 'Title of card 06', description: null, cover: null, memberIds: [], comments: [], attachments: [] },
          { _id: 'card-id-07', boardId: 'board-id-01', columnId: 'column-id-01', title: 'Title of card 07', description: null, cover: null, memberIds: [], comments: [], attachments: [] }
        ]
      },
      // {
      //   _id: 'column-id-04',
      //   boardId: 'board-id-01',
      //   title: 'To Do Column 04',
      //   cardOrderIds: ['card-id-14', 'card-id-15', 'card-id-16', 'card-id-17', 'card-id-18', 'card-id-19', 'card-id-20'],
      //   cards: [
      //     {
      //       _id: 'card-id-01',
      //       boardId: 'board-id-01',
      //       columnId: 'column-id-01',
      //       title: 'Title of card 01',
      //       description: 'Markdown Syntax (sẽ ở khóa nâng cao nhé)',
      //       cover: 'https://wallpapers.com/images/hd/aot-background-v5ccphgr6wp5km2x.jpg',
      //       memberIds: ['test-user-id-01'],
      //       comments: ['test comment 01', 'test comment 02'],
      //       attachments: ['test attachment 01', 'test attachment 02', 'test attachment 03']
      //     },
      //     { _id: 'card-id-02', boardId: 'board-id-01', columnId: 'column-id-01', title: 'Title of card 02', description: null, cover: null, memberIds: [], comments: [], attachments: [] },
      //     { _id: 'card-id-03', boardId: 'board-id-01', columnId: 'column-id-01', title: 'Title of card 03', description: null, cover: null, memberIds: [], comments: [], attachments: [] },
      //     { _id: 'card-id-04', boardId: 'board-id-01', columnId: 'column-id-01', title: 'Title of card 04', description: null, cover: null, memberIds: [], comments: [], attachments: [] },
      //     { _id: 'card-id-05', boardId: 'board-id-01', columnId: 'column-id-01', title: 'Title of card 05', description: null, cover: null, memberIds: [], comments: [], attachments: [] },
      //     { _id: 'card-id-06', boardId: 'board-id-01', columnId: 'column-id-01', title: 'Title of card 06', description: null, cover: null, memberIds: [], comments: [], attachments: [] },
      //     { _id: 'card-id-07', boardId: 'board-id-01', columnId: 'column-id-01', title: 'Title of card 07', description: null, cover: null, memberIds: [], comments: [], attachments: [] }
      //   ]
      // },
      {
        _id: 'column-id-02',
        boardId: 'board-id-01',
        title: 'Inprogress Column 02',
        cover: 'https://wallpapers.com/images/hd/aot-background-v5ccphgr6wp5km2x.jpg',
        cardOrderIds: ['card-id-08', 'card-id-09', 'card-id-10'],
        memberIds: ['test-user-id-01'],
        comments: ['test comment 01', 'test comment 02'],
        attachments: ['test attachment 01', 'test attachment 02', 'test attachment 03'],
        cards: [
          { _id: 'card-id-08', boardId: 'board-id-01', columnId: 'column-id-02', title: 'Title of card 08', description: null, cover: null, memberIds: [], comments: [], attachments: [] },
          { _id: 'card-id-09', boardId: 'board-id-01', columnId: 'column-id-02', title: 'Title of card 09', description: null, cover: null, memberIds: [], comments: [], attachments: [] },
          { _id: 'card-id-10', boardId: 'board-id-01', columnId: 'column-id-02', title: 'Title of card 10', description: null, cover: null, memberIds: [], comments: [], attachments: [] }
        ]
      },
      {
        _id: 'column-id-03',
        boardId: 'board-id-01',
        title: 'Done Column 03',
        cover: 'https://wallpapers.com/images/hd/aot-background-v5ccphgr6wp5km2x.jpg',
        cardOrderIds: ['card-id-11', 'card-id-12', 'card-id-13'],
        cards: [
          { _id: 'card-id-11', boardId: 'board-id-01', columnId: 'column-id-03', title: 'Title of card 11', description: null, cover: null, memberIds: [], comments: [], attachments: [] },
          { _id: 'card-id-12', boardId: 'board-id-01', columnId: 'column-id-03', title: 'Title of card 12', description: null, cover: null, memberIds: [], comments: [], attachments: [] },
          { _id: 'card-id-13', boardId: 'board-id-01', columnId: 'column-id-03', title: 'Title of card 13', description: null, cover: null, memberIds: [], comments: [], attachments: [] }
        ]
      }
    ]
  }
}