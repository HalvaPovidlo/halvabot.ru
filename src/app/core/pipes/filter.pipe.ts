import {Pipe, PipeTransform} from '@angular/core'

@Pipe({name: "filter"})
export class FilterPipe implements PipeTransform {
  transform(items: any, searchText: string): any[] {
    if(!items) {
      return []
    }
    if(!searchText) {
      return items
    }
    searchText = searchText.toLocaleLowerCase()


    return items.filter((it: any) => {
      console.log(it)
      const title = it.title
      const originalTitle = it?.title_original
      const titleMatch = title.toLocaleLowerCase().includes(searchText)
      const originalTitleMatch = originalTitle ? originalTitle.toLocaleLowerCase().includes(searchText) : false
      return titleMatch || originalTitleMatch
      }
    )
  }
}
