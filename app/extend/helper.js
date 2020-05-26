const Excel = require('exceljs');
//设置　start-end　行单元格水平垂直居中/添加边框
function rowCenter(arg_ws, arg_start, arg_end) {
  for(i = arg_start; i <= arg_end; i++) {
      arg_ws.findRow(i).alignment = { vertical: 'middle', horizontal: 'center' };
      //循环 row 中的　cell，给每个 cell添加边框
      arg_ws.findRow(i).eachCell(function (cell, index) {
          cell.border = {
              top: {style:'thin'},
              left: {style:'thin'},
              bottom: {style:'thin'},
              right: {style:'thin'}
          };
      })

  }
}
//设置　start-end 列的宽度
function colWidth(arg_ws, arg_cols, arg_width) {
  for(i in arg_cols) {
      arg_ws.getColumn(arg_cols[i]).width = arg_width;
  }
}
exports.excelDown = async (data,title,that)=>{
  let {ctx} = that
  console.log('ctx=====================>',data)
  let workbook = new Excel.Workbook();
  workbook.creator = '陈康';
  workbook.lastModifiedBy = 'Her';
  workbook.created = new Date(1985, 8, 30);
  workbook.modified = new Date();
  workbook.lastPrinted = new Date(2016, 9, 27);
  // 将工作簿日期设置为 1904 年日期系统
  workbook.properties.date1904 = true;
  // 在加载时强制工作簿计算属性
  workbook.calcProperties.fullCalcOnLoad = true;
  //添加工作表
  // 创建带有红色标签颜色的工作表
  let sheet = workbook.addWorksheet('My Sheet',{properties:{tabColor:{argb:'FFC0000'}}});
  // 使用工作表 id 删除工作表
  // workbook.removeWorksheet(sheet.id)
  sheet.addRow(title);
  // rowCenter(sheet, 6, 13);　
  // colWidth(sheet, [1,2,3,4,5], 20);
  let fileName = 'test.xlsx';
  ctx.response.attachment(fileName);
  ctx.status = 200;
  await workbook.xlsx.write(ctx.res);
  ctx.res.end()
}
exports.excelNew = async (_this,result, req, headers, name, func) =>{
    let columns = [];//exceljs要求的columns
    let hjRow = {};//合计行
    let titleRows = headers.length;//标题栏行数
    console.log('result================================>',result)
    //处理表头
    for (let i = 0; i < titleRows; i++) {
      let row = headers[i];
      for (let j = 0, rlen = row.length; j < rlen; j++) {
        let col = row[j];
        let { f, t, w = 15 } = col;
        if (!f) continue;//不存在f则跳过
 
        if (col.totalRow) hjRow[f] = true;
        if (col.totalRowText) hjRow[f] = col.totalRowText;
        col.style = { alignment: { vertical: 'middle', horizontal: 'center' } };
        col.header = t;
        col.key = f;
        col.width = w;
        columns.push(col);
      }
    }
    let data = result;
    if (func) data = func(data);
 
 
    let workbook = new Excel.Workbook();
    let sheet = workbook.addWorksheet('My Sheet', { views: [{ xSplit: 1, ySplit: 1 }] });
    sheet.columns = columns;
    sheet.addRows(data);
 
    //处理复杂表头
    if (titleRows > 1) {
      for (let i = 1; i < titleRows; i++)  sheet.spliceRows(1, 0, []);//头部插入空行
 
      for (let i = 0; i < titleRows; i++) {
        let row = headers[i];
        for (let j = 0, rlen = row.length; j < rlen; j++) {
          let col = row[j];
          if (!col.m1) continue;
 
          sheet.getCell(col.m1).value = col.t;
          sheet.mergeCells(col.m1 + ":" + col.m2);
        }
      }
    }
 
    //处理样式、日期、字典项
    let that = this;
    sheet.eachRow(function (row, rowNumber) {
      //设置行高
      row.height = 25;
      
      row.eachCell({ includeEmpty: true }, function (cell, colNumber) {
        //设置边框 黑色 细实线
        let top = left = bottom = right = { style: 'thin', color: { argb: '000000' } };
        cell.border = { top, left, bottom, right };
 
        //设置标题部分为粗体
        if (rowNumber <= titleRows) { cell.font = { bold: true };  return; }
 
        //处理数据项里面的日期和字典
        let {type,dict} = columns[colNumber - 1];
        if (type && (cell.value || cell.value == 0)) return;//非日期、字典或值为空的直接返回
        switch(type){
          case 'date': cell.value = that.parseDate(cell.value);break;
          case 'dict': cell.value = that.parseDict(cell.value.toString(), dict);break;
        }
 
      });
    });
 
    _this.ctx.set('Content-Type', 'application/vnd.openxmlformats');
    _this.ctx.set('Content-Disposition', "attachment;filename*=UTF-8' '" + encodeURIComponent(name) + '.xlsx');
    _this.ctx.body = await workbook.xlsx.writeBuffer();
}


exports.parse = (param) =>{
    console.log('param====>',param)
    // return JOSN.parse(param)
}