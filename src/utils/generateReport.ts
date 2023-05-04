import { writeFile } from 'fs';

import { type IMeetup } from '../schemes/meetup/interfaces';
export const generateReport = (data: IMeetup[]) => {
  const res = [
    [
      'name;',
      'description;',
      'tags;',
      'timestamps;',
      'participants;',
      'creator_id',
    ].join(''),
  ];
  for (const item of data) {
    const { name, description, tags, timestamps, participants, creator_id } =
      item;
    res.push(
      [
        `${name};`,
        `${description};`,
        `"${tags?.join(',')}";`,
        (timestamps ? timestamps : 'null') + ';',
        `"${participants.join(',')}";`,
        creator_id,
      ].join('')
    );
  }

  writeFile('rep.csv', res.join('\r\n'), (err) => {
    if (err) {
      console.log(err.message);
    }
  });
};
