const XLSX = require('xlsx')

function removeUnwantedColumns (data, columnsToRemove) {
  data.forEach(row => {
    columnsToRemove.forEach(column =>
      delete row[column]
    )
  })
  return data
}

function makeBook () {
  const wb = XLSX.utils.book_new()
  return wb
}

function addSheetToBook (wb, data, sheetName) {
  const ws = XLSX.utils.json_to_sheet(data)
  XLSX.utils.book_append_sheet(wb, ws, sheetName)
}

function extractData (file, sheetName, titleCellAddress, cellRange, headers, columnsToBeRemoved) {
  const workbook = XLSX.readFile(__dirname + file)
  // const AllWorkbookSheets = workbook.SheetNames

  const worksheet = workbook.Sheets[sheetName]
  const sheetTitle = worksheet[titleCellAddress].v
  worksheet['!ref'] = cellRange // change the sheet range to get specified rows
  const data = XLSX.utils.sheet_to_json(worksheet, { header: headers, defval: 'null' }) // will only use cells within the new range
  const extractedData = removeUnwantedColumns(data, columnsToBeRemoved)
  return extractedData
}

// create a new blank workbook
const wb = makeBook()

// load data from metric sheets
const file = '/metric.xlsm' // original metric file location

// A1 Tab
const a1Headers = ['Ref', 'Broad habitat', 'Habitat type', 'Habitat type_1', 'Area (hectares)', 'Distinctiveness', 'Distinctiveness_Score', 'Condition', 'Condition_Score', 'Strategic significance', 'Strategic significance_1', 'Strategic Significance multiplier', 'Suggested action to address habitat loss', 'Total habitat units', 'Empty', 'Area retained', 'Area enhanced', 'Baseline units retained', 'Baseline units enhanced', 'Area lost', 'Units lost', 'Bespoke compensation for agreed for unacceptable losses', 'Assessor comments', 'Reviewer comments']
const a1ColmnsToRemove = ['Habitat type_1', 'Distinctiveness', 'Distinctiveness_Score', 'Condition_Score', 'Strategic significance_1', 'Strategic Significance multiplier', 'Empty', 'Baseline units retained', 'Baseline units enhanced', 'Area lost']
const a1BaselineData = extractData(file, 'A-1 Site Habitat Baseline', 'D3', 'D11:AA19', a1Headers, a1ColmnsToRemove)

// A2 Tab
const a2Headers = ['Broad habitat', 'Proposed habitat', 'Proposed habitat 2', 'Area (hectares)', 'Distinctiveness', 'Distinctiveness_Score', 'Condition', 'Condition_Score', 'Strategic significance', 'Strategic significance_1', 'Strategic position multiplier', 'Standard time to target condition/years', 'Habitat created in advance/years', 'Delay in starting habitat creations/years', 'Standard or adjusted time to target condition', 'Final time to target condition/years', 'Final time to target multiplier', 'Standard difficulty of creation', 'Applied difficulty multiplier', 'Final difficulty of creation', 'Difficulty multiplier applied', 'Habitat unites delivered', 'Assessor comments', 'Reviewer comments']
const a2ColmnsToRemove = ['Proposed habitat 2', 'Distinctiveness', 'Distinctiveness_Score', 'Condition_Score', 'Strategic significance_1', 'Strategic position multiplier', 'Standard time to target condition/years', 'Standard or adjusted time to target condition', 'Final time to target condition/years', 'Final time to target multiplier', 'Standard difficulty of creation', 'Applied difficulty multiplier', 'Final difficulty of creation', 'Difficulty multiplier applied']
const a2CreationData = extractData(file, 'A-2 Site Habitat Creation', 'D3', 'D11:AA19', a2Headers, a2ColmnsToRemove)


// add new sheets to new workbook
addSheetToBook(wb, a1BaselineData, 'A-1 Site Habitat Baseline')
addSheetToBook(wb, a2CreationData, 'A-2 Site Habitat Creation')

// write file
const newFile = 'extractedMetric.xlsx'
XLSX.writeFile(wb, newFile)
