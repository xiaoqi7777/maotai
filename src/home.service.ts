import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
import * as fs from 'fs';
import * as xlsx from 'node-xlsx';

@Injectable()
export class FamilyWork{
  private readonly logger = new Logger(FamilyWork.name);
  constructor(){
    this.init()
  }
  async init(){
    const path  = `http://quotes.money.163.com/f10/zycwzb_600519.html#01c01`
    const rs = await axios.get(path)
    const $ = cheerio.load(rs.data)
    const dataList = [];
    const titleList = [];
    $('.scr_table tr')
      .eq(0)
      .find('th')
      .each(function () {
        titleList.push($(this).text());
      });
    const index = $('.limit_sale tr').index(
      $(`.limit_sale tr td:contains(${`茅台净利润`})`).parent(),
    );
    $('.scr_table tbody tr')
      .eq(index)
      .find('td')
      .each(function () {
        dataList.push($(this).text());
      });
    this.logger.log('页面解析完成，开始生成文件');
  console.log(`-->`,dataList)
    fs.writeFile(
      `茅台净利润(扣除非经常性损益后).xlsx`,
      xlsx.build(
        [
          {
            name: 'sheet1',
            data: [titleList, dataList],
          },
        ],
        'utf-8',
      ),
      (err) => {
        console.log('err',err)
      },
    );
  }
}
