const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    if (fs.statSync(dirFile).isDirectory()) {
      if (!dirFile.includes('node_modules') && !dirFile.includes('.next') && !dirFile.includes('.git') && !dirFile.includes('target')) {
        filelist = walkSync(dirFile, filelist);
      }
    } else {
      if (dirFile.endsWith('.jsx') || dirFile.endsWith('.js') || dirFile.endsWith('.css') || dirFile.endsWith('.tsx') || dirFile.endsWith('.ts')) {
        filelist.push(dirFile);
      }
    }
  });
  return filelist;
};

const cwd = 'c:\\Users\\Admin\\Desktop\\Project\\data-science-portfolio';
const files = walkSync(cwd);
files.forEach(file => {
  if (file.includes('replace.js') || file.includes('super_replace.js')) return;

  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // rename classes
  content = content.replace(/cyan/g, 'fuchsia');
  content = content.replace(/amber/g, 'indigo');

  // global gradients in globals.css
  content = content.replace(/#06b6d4/g, '#d946ef');
  content = content.replace(/#3b82f6/g, '#be185d');
  
  content = content.replace(/#f59e0b/g, '#6366f1');
  content = content.replace(/#ef4444/g, '#0284c7');

  // section dots hardcoded colors
  content = content.replace(/#22d3ee/g, '#e879f9');
  content = content.replace(/#d97706/g, '#4f46e5');

  // rgba values from rgba strings
  content = content.replace(/rgba\(6,182,212/g, 'rgba(217,70,239');
  content = content.replace(/rgba\(245,158,11/g, 'rgba(99,102,241');

  if (original !== content) {
    fs.writeFileSync(file, content);
    console.log('Updated', file);
  }
});
