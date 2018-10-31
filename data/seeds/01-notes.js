
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {title: 'Note-1', content: 'These are just test notes, woot woot, scribble scribble'},
        {title: 'Note-2', content: 'These are just test notes, woot woot, scribble scribble'},
        {title: 'Note-3', content: 'These are just test notes, woot woot, scribble scribble'}
      ]);
    });
};
