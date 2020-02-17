exports.handleErr = (err) => {
  if (err.code === 'EEXIST') {
    console.log('Please don\'t write over things.')
  } else {
    throw err
  }
}
