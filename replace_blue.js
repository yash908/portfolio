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
  if (file.includes('replace.js') || file.includes('super_replace.js') || file.includes('replace_colors.js') || file.includes('replace_blue.js')) return;

  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // replace tailwind class names
  content = content.replace(/violet/g, 'blue');

  // globals.css gradients
  content = content.replace(/#8b5cf6/g, '#3b82f6'); // violet-500 -> blue-500
  content = content.replace(/#d946ef/g, '#06b6d4'); // fuchsia-500 -> cyan-500
  
  // other hex codes that might be hardcoded in section dots or hero
  content = content.replace(/#a78bfa/g, '#60a5fa'); // violet-400 -> blue-400

  // rgba values from rgba strings (mostly used for box-shadows)
  // rgba(139,92,246 -> violet-500 -> blue-500 rgba(59,130,246
  content = content.replace(/rgba\(139,92,246/g, 'rgba(59,130,246');

  if (original !== content) {
    fs.writeFileSync(file, content);
    console.log('Updated', file);
  }
});
