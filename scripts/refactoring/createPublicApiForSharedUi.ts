import path from 'path';

import { Project } from 'ts-morph';

const project = new Project({});

project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

const files = project.getSourceFiles();

const uiPath = path.resolve(__dirname, '..', '..', 'src', 'shared', 'ui');
const sharedUiDirectory = project.getDirectory(uiPath);
const componentsDir = sharedUiDirectory?.getDirectories();

const layers = ['app', 'shared', 'entities', 'features', 'widgets', 'pages'];
const isAbsoluteAndLayer = (value: string) => {
  return layers.some((layer) => value.startsWith(layer));
};

componentsDir?.forEach((directory) => {
  const fullFolderPath = directory.getPath();
  const indexFilePath = `${fullFolderPath}/index.ts`;
  const indexFile = directory.getSourceFile(indexFilePath);
  const directoryBaseName = directory.getBaseName();
  // console.log(`${directoryBaseName}, has index.ts:`, Boolean(indexFile));

  if (!indexFile) {
    const component = directoryBaseName.replace('.tsx', '');

    // or export * from './...'
    const sourceCode = `export { ${component} } from './${directoryBaseName}';`;
    const file = directory.createSourceFile(indexFilePath, sourceCode, {
      overwrite: true,
    });

    file
      .save()
      .then(() => console.log(`${fullFolderPath} --> index.ts created!`));
  }
});

files.forEach((sourceFile) => {
  const importDeclarations = sourceFile.getImportDeclarations();

  importDeclarations.forEach((importDeclaration) => {
    const value = importDeclaration.getModuleSpecifierValue();
    const valueWithoutAlias = value.replace('@/', '');

    const segments = valueWithoutAlias.split('/');

    const isSharedLayer = segments?.[0] === 'shared';
    const isUiSlice = segments?.[1] === 'ui';

    if (isAbsoluteAndLayer(valueWithoutAlias) && isSharedLayer && isUiSlice) {
      const result = valueWithoutAlias.split('/').slice(0, 3).join('/');
      const newImport = `@/${result}`;
      console.log(value, '->', newImport);
      importDeclaration.setModuleSpecifier(newImport);
    }
  });
});

project.save();
