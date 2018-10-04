import { Component, OnInit, ViewChild } from '@angular/core'
import { ActivatedRoute } from '@angular/router';
import { MaterialsService, IMaterials } from '../services/materials.service';
import { environment } from '../../../environments/environment';
import { FileItem, FileUploader } from "ng2-file-upload";
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

@Component({
    templateUrl: './materials.component.html',
    styleUrls: ['./materials.component.css']
})

export class MaterialsComponent implements OnInit {

    materialsList: any[]
    uploadMaterialId :number

    env: string

    displayedColumns: string[] = [
        'material_id', 'material_name', 'type_id', 
        'original_width', 'original_height', 'original_depth',
        'code', 'description_m', 'image', 'action'
    ];

    dataSource: any

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    public uploader:FileUploader = new FileUploader({
		allowedMimeType: ['image/png', 'image/jpeg'],
		maxFileSize: 1024000,
		autoUpload: false,
		isHTML5: true,
		method: 'POST',
		itemAlias: 'photo',
		authToken: sessionStorage.getItem("adminToken")
	});

    constructor(private materialsService: MaterialsService,
        private route: ActivatedRoute) {this.env = "../../../assets/images/materials/"} 

    ngOnInit() {
        this.getAllMaterials()

        // Upload error notifications
		this.uploader.onWhenAddingFileFailed = (item, filter: any, options: any) => {
            if (item.size > 1024000){}
			if(this.uploader.options.allowedMimeType.indexOf(item.type) == -1){}
        };
        
        // Upload file to server instantly (when user selects it)
		this.uploader.onAfterAddingFile = (item :FileItem) => {
            item.url = environment.serverUrl + `/materials-photo/${this.uploadMaterialId}`;
            
			item.upload();
			this.uploader = this.uploader;
        };
        
        // When file is uploaded to the server
		this.uploader.onCompleteItem = (item: any, res: any, status: any, headers: any) => { () => this.getAllMaterials() }
		this.uploader.onErrorItem = (e) => { this.uploader = this.uploader; }
    }

    removePhoto(id: number){
		this.materialsService.deleteMaterialPhoto(id).subscribe( e => { this.getAllMaterials() })
        
    }

    getAllMaterials() {
        this.materialsService.getAllMaterials().subscribe((prod: any) => {
            this.materialsList = JSON.parse(prod._body)
            
            this.dataSource = new MatTableDataSource<IMaterials>(this.materialsList)
            this.dataSource.sort = this.sort
            this.dataSource.paginator = this.paginator
        })
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    deleteMaterial(id) {
        this.materialsService.deleteMaterials(id).subscribe( e => { this.getAllMaterials() })
        
    }

    setUploadId(materialId) { 
		this.uploadMaterialId = materialId;
	}
}