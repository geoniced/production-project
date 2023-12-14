import path from 'path';

import { Project } from 'ts-morph';

const project = new Project({});

project.addSourceFilesAtPaths('docs/**/*.md');
project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');
project.addSourceFilesAtPaths('src/**/*.md');

const files = project.getSourceFiles();

const SliceMap = {
  pages: 'Page',
  widgets: 'Widget',
  features: 'Feature',
  entities: 'Entity',
} as const;

type Slice = keyof typeof SliceMap;

const createReadmeFilesForSlice = (slice: Slice) => {
  if (!Object.keys(SliceMap).includes(slice)) return;

  const slicePath = path.resolve(__dirname, '..', '..', 'src', `${slice}`);
  const sliceDirectory = project.getDirectory(slicePath);
  const sliceDirectories = sliceDirectory?.getDirectories();

  sliceDirectories?.forEach((directory) => {
    const fullFolderPath = directory.getPath();
    const readmeFilePath = `${fullFolderPath}/README.md`;
    const readmeFile = directory.getSourceFile(readmeFilePath);

    if (!readmeFile) {
      const sliceName = SliceMap[slice];
      const directoryBaseName = directory.getBaseName();
      const componentName = directoryBaseName.replace('.tsx', '');

      const readmeContents = `## ${sliceName} ${componentName}`;

      const file = directory.createSourceFile(readmeFilePath, readmeContents, {
        overwrite: true,
      });

      file
        .save()
        .then(() => console.log(`${fullFolderPath} --> README.md created!`));
    }
  });
};

const capitalize = (str: string) => `${str[0].toUpperCase()}${str.slice(1)}`;
const getSrcPath = (filePath: string) => {
  const pathList = filePath.split('/');
  const srcIndex = pathList.indexOf('src');
  const pathWithSrc = pathList.slice(srcIndex).join('/');
  return pathWithSrc;
};

const createReadmeWithCreatedReadmeFiles = (slices: Slice[]) => {
  const docsPath = path.resolve(__dirname, '..', '..', `docs`);
  const docsDirectory = project.getDirectory(docsPath);
  const componentsPath = docsDirectory
    ? `${docsDirectory?.getPath()}/components.md`
    : null;
  let componentsContents = ``;

  slices.forEach((slice) => {
    const slicePath = path.resolve(__dirname, '..', '..', 'src', `${slice}`);
    const sliceDirectory = project.getDirectory(slicePath);
    const sliceDirectories = sliceDirectory?.getDirectories();

    componentsContents += `\n## ${capitalize(slice)}:\n`;

    sliceDirectories?.forEach((directory) => {
      const fullFolderPath = directory.getPath();
      const readmeFilePath = `${fullFolderPath}/README.md`;
      const readmeFile = directory.getSourceFile(readmeFilePath);

      if (readmeFile) {
        const directoryBaseName = directory.getBaseName();
        const componentName = directoryBaseName.replace('.tsx', '');

        const projectRelatedFilePath = getSrcPath(readmeFilePath);
        const contents = ` - [${componentName}](../${projectRelatedFilePath})`;

        componentsContents += `\n${contents}`;
      }
    });

    componentsContents += `\n`;
  });

  if (docsDirectory && componentsPath) {
    const file = docsDirectory.createSourceFile(
      componentsPath,
      componentsContents,
      {
        overwrite: true,
      },
    );

    file
      .save()
      .then(() => console.log(`${componentsPath} --> components.md created!`));
  }
};

createReadmeFilesForSlice('entities');
createReadmeFilesForSlice('features');

createReadmeWithCreatedReadmeFiles(['entities', 'features']);

project.save();
