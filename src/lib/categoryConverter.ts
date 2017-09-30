// type InputCategory = 'before dinner cocktail' |
//   'unknown' |
//   'all day cocktail' |
//   'longdrink' |
//   'sparkling cocktail' |
//   'after dinner cocktail' |
//   'after dinner' |
//   'hot drink';

type OutputCategory = 'Ancestrals' | 'Sours' | 'Spirit Forward' | 'Duos and Trios' |
  'Champagne' | 'Highball, Collins, Fizzes' | 'Juleps and Smashes' | 'Hot Drinks' |
  'Flips and Nogs' | 'Layered Drinks and Shots' | 'Tropical Drinks' | 'Punch' |
  'Cobblers' | 'Savory' | 'Non-alcoholic' | 'Orphans';

const categories: { [index: string]: string[] } = {
  'ancestrals': ['Old Fashioned', 'Sazerac', 'Aviation'],
  'champagne': ['Mimosa', 'French 75', 'Bellini', 'Spritz Veneziano',
    'Barracuda', 'Champagne Cocktail', 'Russian Spring Punch', 'Screwdriver'],
  'cobblers': ['Bramble'],
  'duos and trios': ['Black Russian', 'Alexander', 'God Mother', 'French Connection',
    'God Father', 'Grasshopper', 'Porto Flip', 'Rusty Nail', 'Stinger', 'Golden Dream',
    'Angel Face'],
  'flips': [],
  'highball': ['Americano', 'Mojito', 'Cuba Libre', 'Gin Fizz', 'Moscow Mule', 'John Collins',
    'Dark \'n\' Stormy', 'Ramos Fizz', 'Horse\'s Neck', 'Sea Breeze'],
  'hot': ['Irish Coffee'],
  'juleps': ['Mint Julep', 'Derby'],
  'layered and shots': ['B52'],
  'non-alcoholic': [],
  'orphans': ['Kir', 'Rose', 'Espresso Martini'],
  'savory': ['Vampiro', 'Bloody Mary'],
  'sours': ['Bacardi', 'Whiskey Sour', 'Daiquiri', 'Pisco Sour', 'Clover Club',
    'Margarita', 'Lemon Drop Martini', 'Monkey Gland', 'Sidecar', 'Tommy\'s Margarita',
    'Hemingway Special', 'Cosmopolitan', 'Between the Sheets', 'Casino', 'Caipirinha',
    'Kamikaze', 'White Lady', 'Harvey Wallbanger', 'Tequila Sunrise', 'French Martini',
    'Paradise'],
  'spirit forward': ['Vesper', 'Negroni', 'Manhattan', 'Dirty Martini',
    'Dry Martini', 'Tuxedo'],
  'tropical': ['Yellow Bird', 'Planter\'s Punch', 'Long Island Iced Tea', 'Pina Colada',
    'Mai-tai', 'Sex on the Beach', 'Singapore Sling', 'Mary Pickford'],
};

export const convertCategory: (inputDrinkName: string) => OutputCategory = (inName) => {
  const categoryNames = Object.getOwnPropertyNames(categories);
  let match;
  for (const categoryName of categoryNames) {
    const drinksInCategory = categories[categoryName];
    if (drinksInCategory.indexOf(inName) !== -1) {
      match = categoryName;
      break;
    } else {
      continue;
    }
  }
  switch (match) {
    case undefined: throw new Error('Could not match drink to category');
    case 'ancestrals': return 'Ancestrals';
    case 'champagne': return 'Champagne';
    case 'cobblers': return 'Cobblers';
    case 'duos and trios': return 'Duos and Trios';
    case 'flips': return 'Flips and Nogs';
    case 'highball': return 'Highball, Collins, Fizzes';
    case 'hot': return 'Hot Drinks';
    case 'juleps': return 'Juleps and Smashes';
    case 'layered and shots': return 'Layered Drinks and Shots';
    case 'non-alcoholic': return 'Non-alcoholic';
    case 'orphans': return 'Orphans';
    case 'savory': return 'Savory';
    case 'sours': return 'Sours';
    case 'spirit forward': return 'Spirit Forward';
    case 'tropical': return 'Tropical Drinks';
    default: throw new Error('Category does not exist');
  }
};
