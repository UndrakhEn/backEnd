boldgui_ugs = ['писдаа', 'сда', 'эргүү', 'новш'];
bichsen_ugs = 'сдааа заа энэ одоо арай дэнднээ новшуудаа эргүү юмуу';

words = bichsen_ugs.split(' ');

words.forEach(ug => {
  boldgui_ugs.forEach(boldgui => {
    if (ug.includes(boldgui)) console.log(ug);
  });
});
