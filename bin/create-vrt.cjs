#! /usr/bin/env node

'use strict'

const path = require('path')
const util = require('util')
const fs = require('fs')
const { execSync } = require( 'child_process' )
const exec = util.promisify(require('child_process').exec)


async function runCmd(command) {
  try {
    const { stdout, stderr } = await exec(command)
    console.log(stdout)
    console.log(stderr)
  } catch {
    (error) => {
      console.log('\x1b[31m', error, '\x1b[0m')
    }
  }
}

if (process.argv.length < 3) {
  console.log('Please include the name of your app')
  console.log('For example:')
  console.log('    npx create-vrt awesome-app')
  process.exit(1)
}

const currentPath = process.cwd()
const projectName = process.argv[2]
const projectPath = path.join(currentPath, projectName)
const repo = 'https://github.com/stacksantos/CREATE-VRT.git'

try {
  fs.mkdirSync(projectPath)
} catch (err) {
  if (err.code === 'EEXIST') {
    console.log(
      `The file ${projectName} already exist in the current directory, please give it another name.`
    )
  } else {
    console.log(error)
  }
  process.exit(1)
}

async function main() {
  try {
    console.log('\x1b[33m', 'Getting the goods...', '\x1b[0m')
    exec(`git clone ${repo} ${projectPath}`)

    process.chdir(projectPath)

    console.log('BEEP BOOP BEEP...')
    await runCmd('npm install')
    console.log('Getting rid of the junk...')

    await runCmd('npx rimraf ./.git')

    // fs.rm(path.join(projectPath, 'bin'), { recursive: true })

    console.log('Good to go! Now build something awesome!')
  } catch (error) {
    console.log(error)
  }
}
main()
