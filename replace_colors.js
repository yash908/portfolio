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
  if (file.includes('replace.js') || file.includes('super_replace.js') || file.includes('replace_colors.js')) return;

  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // replace tailwind class names
  content = content.replace(/cyan/g, 'violet');
  content = content.replace(/amber/g, 'emerald');

  // globals.css gradients
  // cyan gradient was #06b6d4 (cyan-500) to #3b82f6 (blue-500)
  content = content.replace(/#06b6d4/g, '#8b5cf6'); // violet-500
  content = content.replace(/#3b82f6/g, '#d946ef'); // fuchsia-500
  
  // amber gradient was #f59e0b (amber-500) to #ef4444 (red-500)
  content = content.replace(/#f59e0b/g, '#10b981'); // emerald-500
  content = content.replace(/#ef4444/g, '#0ea5e9'); // sky-500

  // other hex codes that might be hardcoded in section dots or hero
  content = content.replace(/#22d3ee/g, '#a78bfa'); // cyan-400 -> violet-400
  content = content.replace(/#d97706/g, '#059669'); // amber-600 -> emerald-600

  // rgba values from rgba strings (mostly used for box-shadows)
  // rgba(6,182,212 -> cyan-500 -> violet-500 rgba(139,92,246
  content = content.replace(/rgba\(6,182,212/g, 'rgba(139,92,246');
  // rgba(245,158,11 -> amber-500 -> emerald-500 rgba(16,185,129
  content = content.replace(/rgba\(245,158,11/g, 'rgba(16,185,129');
  
  // rgba(217,119,6 -> amber-600 -> emerald-600 rgba(5,150,105
  content = content.replace(/rgba\(217,119,6/g, 'rgba(5,150,105');

  if (original !== content) {
    fs.writeFileSync(file, content);
    console.log('Updated', file);
  }
});
