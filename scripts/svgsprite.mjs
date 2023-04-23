import { fileURLToPath } from 'url';
import { dirname } from 'path';
import svgstore from 'svgstore';
import fs from 'fs';
import path from 'path';
import glob from 'glob';
import chalk from 'chalk';
import { promisify } from 'util';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const globAsync = promisify(glob);

const svgSprite = async () => {
    const svgSpritePath = path.resolve(__dirname, '../src/components/icon/svg');
    const svgSpriteFiles = await globAsync('**/*.svg', { cwd: svgSpritePath });

    let sprites = svgstore({
        copyAttrs: true,
        svgAttrs: {
            width: 0,
            height: 0,
            style: 'display: none;',
        },
    });

    svgSpriteFiles.forEach((file) => {
        const svg = fs.readFileSync(path.resolve(svgSpritePath, file), 'utf8');
        const fileName = file.replace('.svg', '');
        sprites.add(
            fileName,
            svg,
            {
                symbolAttrs: {
                    class: `fig-svg-icon fig-svg-icon-${fileName}`
                }
            }
        );
    });

    sprites = sprites.toString({
        inline: true
    });

    fs.writeFileSync(
        path.resolve(__dirname, '../src/components/icon/SvgSprite.vue'),
        `<template>${sprites}</template>`
    );

    console.log(chalk.green('SVG Sprite generated'));
}

svgSprite();
