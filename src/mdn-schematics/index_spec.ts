import * as path from 'path';

import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';

const collectionPath = path.join(__dirname, "../collection.json");

describe("mdn-schematics", () => {
  it("should thrown an error if no name is provided", () => {
    const runner = new SchematicTestRunner("schematics", collectionPath);
    expect(() => runner.runSchematicAsync("mdn-schematics", {}, Tree.empty())).toThrow();
  });

  it("should create the project with sass folder", async () => {
    const runner = new SchematicTestRunner("mdn-schematics", collectionPath);

    runner
      .runSchematicAsync("ng-new", { name: "any-name" }, Tree.empty())
      .subscribe((tree) => {
        const sassFolder = tree.getDir("any-name/src/sass");

        expect(sassFolder).toBeDefined();
        expect(sassFolder.subfiles.length).toEqual(6);
        expect(tree.files.length).toEqual(40);
      });
  });

  it("should create the project with .scss files by default", async () => {
    const runner = new SchematicTestRunner("mdn-schematics", collectionPath);

    runner
      .runSchematicAsync("ng-new", { name: "any-name" }, Tree.empty())
      .subscribe((tree) => {
        const sassFolder = tree.getDir("any-name/src/sass");
        const sassFiles = sassFolder.subfiles;

        sassFiles.forEach((sassFile) => {
          expect(sassFile.endsWith(".scss")).toBeTruthy();
        });
      });
  });

  it("should create default folders", async () => {
    const runner = new SchematicTestRunner("mdn-schematics", collectionPath);

    runner
      .runSchematicAsync("ng-new", { name: "any-name" }, Tree.empty())
      .subscribe((tree) => {
        const componentsFolder = tree.getDir("any-name/src/app/components");
        const directivesFolder = tree.getDir("any-name/src/app/directives");
        const mocksFolder = tree.getDir("any-name/src/app/mocks");
        const modelsFolder = tree.getDir("any-name/src/app/models");
        const pagesFolder = tree.getDir("any-name/src/app/pages");
        const pipesFolder = tree.getDir("any-name/src/app/pipes");
        const servicesFolder = tree.getDir("any-name/src/app/services");

        expect(componentsFolder).toBeDefined();
        expect(componentsFolder.subfiles.length).toEqual(1);

        expect(directivesFolder).toBeDefined();
        expect(directivesFolder.subfiles.length).toEqual(1);

        expect(mocksFolder).toBeDefined();
        expect(mocksFolder.subfiles.length).toEqual(1);

        expect(modelsFolder).toBeDefined();
        expect(modelsFolder.subfiles.length).toEqual(1);

        expect(pagesFolder).toBeDefined();
        expect(pagesFolder.subfiles.length).toEqual(1);

        expect(pipesFolder).toBeDefined();
        expect(pipesFolder.subfiles.length).toEqual(1);

        expect(servicesFolder).toBeDefined();
        expect(servicesFolder.subfiles.length).toEqual(1);

        expect(tree.files.length).toEqual(40);
      });
  });
});
