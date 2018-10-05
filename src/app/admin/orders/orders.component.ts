import { Component, OnInit, ViewChildren, QueryList, ElementRef, HostListener } from '@angular/core'
import { OrdersService, IOrder } from '../services/orders.service';
import { OrderItemsService } from '../services/order-items.service'
import { SidebarService } from '../services/sidebar.service'
import { environment } from '../../../environments/environment';
import { FileItem, FileUploader } from "ng2-file-upload";

@Component({
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.css']
})

export class OrdersComponent implements OnInit{
    
    ordersList
    uploadItemlId :number
    env: string

    panelOpenState = false;
    private sorted = false;

    public uploader:FileUploader = new FileUploader({
		allowedMimeType: ['image/png', 'image/jpeg'],
		maxFileSize: 1024000,
		autoUpload: false,
		isHTML5: true,
		method: 'POST',
		itemAlias: 'photo',
		authToken: sessionStorage.getItem("adminToken")
	});

    // for pagination
    @ViewChildren('pages') pages: QueryList<any>
    itemsPerPage = 5;
    numberOfVisiblePaginators = 10;
    numberOfPaginators: number;
    paginators: Array<any> = [];
    activePage = 1;
    firstVisibleIndex = 1;
    lastVisibleIndex: number = this.itemsPerPage;
    firstVisiblePaginator = 0;
    lastVisiblePaginator = this.numberOfVisiblePaginators;

    constructor(private ordersService: OrdersService,
                private orderItemsService: OrderItemsService,
                private sideBar: SidebarService,
                private el: ElementRef) {

                    this.env = "../../../assets/images/order-items/" 
                } 

    ngOnInit() {
        this.sideBar.show()
        this.getAllOrders()

        // Upload error notifications
		this.uploader.onWhenAddingFileFailed = (item, filter: any, options: any) => {
            if (item.size > 1024000){}
			if(this.uploader.options.allowedMimeType.indexOf(item.type) == -1){}
        };
        
        // Upload file to server instantly (when user selects it)
		this.uploader.onAfterAddingFile = (item :FileItem) => {
            item.url = environment.serverUrl + `/order-item-photo/${this.uploadItemlId}`;
            
			item.upload();
			this.uploader = this.uploader;
        };
        
        // When file is uploaded to the server
		this.uploader.onCompleteItem = (item: any, res: any, status: any, headers: any) => { () => this.getAllOrders() }
        this.uploader.onErrorItem = (e) => { this.uploader = this.uploader; }
        
        // for pagination
        setTimeout(() => {
            if (this.ordersList.length % this.itemsPerPage === 0) {
                this.numberOfPaginators = Math.floor(this.ordersList.length / this.itemsPerPage) + 1;
            } else {
                this.numberOfPaginators = Math.floor(this.ordersList.length / this.itemsPerPage + 1) + 1;
            }
          
            for (let i = 1; i <= this.numberOfPaginators; i++) {
                this.paginators.push(i);
            }
        }, 400)
    }

    getAllOrders(){
        this.ordersService.getOrdersLeyaout().subscribe((prod: any) => {
            this.ordersList = JSON.parse(prod._body)
        })
    }

    setUploadId(item_id) {
		this.uploadItemlId = item_id;
    }
    
    removePhoto(id: number){
		this.orderItemsService.deleteItemPhoto(id).subscribe( e => { this.getAllOrders() })
        
    }

    // fore pagination
    changePage(event: any) {
        
        if (event.target.text >= 1 && event.target.text <= this.numberOfPaginators) {
          this.activePage = +event.target.text;
          this.firstVisibleIndex = this.activePage * this.itemsPerPage - this.itemsPerPage + 1;
          this.lastVisibleIndex = this.activePage * this.itemsPerPage;
        }
    }

    nextPage(event: any) {
        if (this.pages.last.nativeElement.classList.contains('active')) {
          if ((this.numberOfPaginators - this.numberOfVisiblePaginators) >= this.lastVisiblePaginator) {
            this.firstVisiblePaginator += this.numberOfVisiblePaginators;
          this.lastVisiblePaginator += this.numberOfVisiblePaginators;
          } else {
            this.firstVisiblePaginator += this.numberOfVisiblePaginators;
          this.lastVisiblePaginator = this.numberOfPaginators;
          }
        }
    
        this.activePage += 1;
        this.firstVisibleIndex = this.activePage * this.itemsPerPage - this.itemsPerPage + 1;
        this.lastVisibleIndex = this.activePage * this.itemsPerPage;
    }

    previousPage(event: any) {
        if (this.pages.first.nativeElement.classList.contains('active')) {
          if ((this.lastVisiblePaginator - this.firstVisiblePaginator) === this.numberOfVisiblePaginators)  {
            this.firstVisiblePaginator -= this.numberOfVisiblePaginators;
            this.lastVisiblePaginator -= this.numberOfVisiblePaginators;
          } else {
            this.firstVisiblePaginator -= this.numberOfVisiblePaginators;
            this.lastVisiblePaginator -= (this.numberOfPaginators % this.numberOfVisiblePaginators);
          }
        }
    
        this.activePage -= 1;
        this.firstVisibleIndex = this.activePage * this.itemsPerPage - this.itemsPerPage + 1;
        this.lastVisibleIndex = this.activePage * this.itemsPerPage;
    }

    firstPage() {
        this.activePage = 1;
        this.firstVisibleIndex = this.activePage * this.itemsPerPage - this.itemsPerPage + 1;
        this.lastVisibleIndex = this.activePage * this.itemsPerPage;
        this.firstVisiblePaginator = 0;
        this.lastVisiblePaginator = this.numberOfVisiblePaginators;
    }

    lastPage() {
        this.activePage = this.numberOfPaginators;
        this.firstVisibleIndex = this.activePage * this.itemsPerPage - this.itemsPerPage + 1;
        this.lastVisibleIndex = this.activePage * this.itemsPerPage;
    
        if (this.numberOfPaginators % this.numberOfVisiblePaginators === 0) {
          this.firstVisiblePaginator = this.numberOfPaginators - this.numberOfVisiblePaginators;
          this.lastVisiblePaginator = this.numberOfPaginators;
        } else {
          this.lastVisiblePaginator = this.numberOfPaginators;
          this.firstVisiblePaginator = this.lastVisiblePaginator - (this.numberOfPaginators % this.numberOfVisiblePaginators);
        }
    }

    // Table sort
    sortBy(by: string | any): void {
        this.ordersList.sort((a: any, b: any) => {
          if (a[by] < b[by]) {
            return this.sorted ? 1 : -1;
          }
          if (a[by] > b[by]) {
            return this.sorted ? -1 : 1;
          }
          return 0;
        });
    
        this.sorted = !this.sorted;
    }

}