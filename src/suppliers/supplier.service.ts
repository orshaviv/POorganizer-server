import {HttpException, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Supplier} from "./supplier.interface";
import {Repository} from "typeorm";

@Injectable()
export class SupplierService {
    constructor(@InjectRepository(Supplier) private repo: Repository<Supplier>) {
    }

    welcomeScreen() {
        return 'Welcome to suppliers screen. For all suppliers go to /suppliers/all. ';
    }

    getAllSuppliers() {
        return this.repo.find({});
    }

    getSupplierById(id: number) {
        return this.repo.findOne(id);
    }

    async addSupplier(supplier: Supplier) {
        let result = await this.repo.findOne({supplier_name: supplier.supplier_name})
        if (result) {
            throw new HttpException('Supplier already exists', 422);
        }
        await this.repo.save(supplier);
        throw new HttpException('Supplier has been added', 200);
    }

    async removeSupplier(name: string) {
        let supplierToRemove = await this.repo.findOne({supplier_name: name});

        if (supplierToRemove) {
            await this.repo.remove(supplierToRemove);
            throw new HttpException('Supplier has been removed', 200);
        } else {
            throw new HttpException('Supplier name not found', 422);
        }
    }
}