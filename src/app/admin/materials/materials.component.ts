import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router';
import { MaterialsService, IMaterials } from '../services/materials.service';
import { environment } from '../../../environments/environment';
import { FileItem, FileUploader, FileSelectDirective } from "ng2-file-upload";

@Component({
    templateUrl: './materials.component.html',
    styleUrls: ['./materials.component.css']
})

export class MaterialsComponent implements OnInit {

    materialsList: IMaterials
    uploadMaterialId :number
	uploadPhotoTyple :string

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
        private route: ActivatedRoute) { }

    ngOnInit() {
        this.getAllMaterials()

        // Upload error notifications
		this.uploader.onWhenAddingFileFailed = (item, filter: any, options: any) => {
            if (item.size > 1024000){}
			if(this.uploader.options.allowedMimeType.indexOf(item.type) == -1){}
        };
        
        // Upload file to server instantly (when user selects it)
		this.uploader.onAfterAddingFile = (item :FileItem) => {
			item.url = environment.serverUrl + `/api/public-groups/upload-${this.uploadPhotoTyple}/${this.uploadMaterialId}`;
			item.upload();
			this.uploader = this.uploader;
        };
        
        // When file is uploaded to the server
		this.uploader.onCompleteItem = (item: any, res: any, status: any, headers: any) => { () => this.getAllMaterials() };
		this.uploader.onErrorItem = (e) => { this.uploader = this.uploader; }
    }

    getAllMaterials() {
        this.materialsService.getAllMaterials().subscribe((prod: any) => {
            this.materialsList = JSON.parse(prod._body)
        })
    }

    deleteMaterial(id) {
        this.materialsService.deleteMaterials(id).subscribe( e => { this.getAllMaterials() })
        
    }

    setUploadId(groupId, photoType) { 
		this.uploadMaterialId = groupId;
		this.uploadPhotoTyple = photoType;
	}
}