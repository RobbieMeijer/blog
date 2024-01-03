const someFieldsAreEmpty = ([...fields]) =>
  fields?.some((field) => '' === field || null === field);

export default someFieldsAreEmpty;
