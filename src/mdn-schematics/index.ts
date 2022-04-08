import {
    apply, chain, externalSchematic, mergeWith, move, Rule, SchematicContext, Tree, url
} from '@angular-devkit/schematics';

interface SchemaOptions {
  name: string;
}

export function main(_options: SchemaOptions): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const rule = chain([
      runNgNewSchematic(_options),
      createDefaultFolders(_options),
      createSassFolder(_options),
    ]);
    return rule(tree, _context);
  };
}

function runNgNewSchematic({ name }: SchemaOptions) {
  return externalSchematic("@schematics/angular", "ng-new", {
    name,
    version: "13.3.2",
    directory: name,
    routing: false,
    style: "scss",
    inlineStyle: false,
    inlineTemplate: false,
  });
}

function createDefaultFolders({ name }: SchemaOptions) {
  return (tree: Tree, _context: SchematicContext) => {
    tree.create(`${name}/src/app/components/.gitkeep`, "");
    tree.create(`${name}/src/app/directives/.gitkeep`, "");
    tree.create(`${name}/src/app/mocks/.gitkeep`, "");
    tree.create(`${name}/src/app/models/.gitkeep`, "");
    tree.create(`${name}/src/app/pages/.gitkeep`, "");
    tree.create(`${name}/src/app/pipes/.gitkeep`, "");
    tree.create(`${name}/src/app/services/.gitkeep`, "");
  };
}

function createSassFolder({ name }: SchemaOptions) {
  return (_: Tree, _context: SchematicContext) => {
    const transformedSource = apply(url("./files/sass"), [move(`${name}/src/sass`)]);
    return mergeWith(transformedSource);
  };
}
