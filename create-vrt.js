#!/usr/bin/env node

const { execSync } = require('child_process')
const path = require('path')
const fs = require('fs')

if (process.argv.length < 3) {
  console.log('Please include the name of your app')
  console.log('For example:')
  console.log('    npx create-vrt awesome-app')
  process.exit(1)
}

const projectName = process.argv[2]
const currentPath = process.cwd()
const projectPath = path.join(currentPath, projectName)
const git_repo = 'https://github.com/stacksantos/CREATE-VRT'

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
    console.log('Getting the goods...')
    execSync(`git clone --depth 1 ${git_repo} ${projectPath}`)

    process.chdir(projectPath)

    console.log('Pressing the buttons...')
    execSync('npm install')

    console.log('Getting rid of the junk...')
    execSync('npx rimraf ./.git')
    fs.rmdirSync(path.join(projectPath, 'bin'), { recursive: true })

    console.log('Good to go! Now make something awesome!')
  } catch (error) {
    console.log(error)
  }
}
main()
