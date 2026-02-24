const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    if (fs.statSync(dirFile).isDirectory()) {
      if (!dirFile.includes('node_modules') && !dirFile.includes('.next') && !dirFile.includes('.git') && !dirFile.includes('target') && !dirFile.includes('src')) {
        filelist = walkSync(dirFile, filelist);
      }
    } else {
      if (dirFile.endsWith('.jsx') || dirFile.endsWith('.js') || dirFile.endsWith('.css')) {
        filelist.push(dirFile);
      }
    }
  });
  return filelist;
};

const cwd = 'c:\\Users\\Admin\\Desktop\\Project\\data-science-portfolio';
const files = walkSync(cwd);
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  content = content.replace(/cyan/g, 'violet');
  content = content.replace(/amber/g, 'emerald');
  content = content.replace(/rgba\(6,182,212/g, 'rgba(139,92,246'); // violot-500 #8b5cf6
  content = content.replace(/rgba\(0,255,255/g, 'rgba(139,92,246');
  content = content.replace(/rgba\(217,119,6/g, 'rgba(16,185,129'); // emerald-500 #10b981
  content = content.replace(/rgba\(245,158,11/g, 'rgba(16,185,129'); // emerald-500
  content = content.replace(/#06b6d4/g, '#8b5cf6'); // violet-500
  content = content.replace(/#3b82f6/g, '#d946ef'); // fuchsia-500
  content = content.replace(/#f59e0b/g, '#10b981'); // emerald-500
  content = content.replace(/#ef4444/g, '#0ea5e9'); // sky-500
  
  if (original !== content) {
    fs.writeFileSync(file, content);
    console.log('Updated', file);
  }
});
