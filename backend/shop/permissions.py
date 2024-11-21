<<<<<<< HEAD
from rest_framework import permissions


class IsAdminUserOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True

        # check if user is in group "admin"
        return request.user.groups.filter(name="admin").exists()   


class IsModeratorUserOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True

        # check if user is in group "moderator"
        return request.user.groups.filter(name="moderator").exists()
    

class IsEnterepreneurOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user.groups.filter(name="entrepreneur").exists()

    def has_object_permission(self, request, view, obj):
        return obj.entrepreneur == request.user
    

class AllowUnauthenticatedReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.method in permissions.SAFE_METHODS


class DynamicRolePermission(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True

        if view.action == "create_moderator" and request.user.groups.filter(name="admin").exists():
            return True

        if view.action == "approve_category" and request.user.groups.filter(name="moderator").exists():
            return True

        return False    
=======
from rest_framework import permissions


class IsAdminUserOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True

        # check if user is in group "admin"
        return request.user.groups.filter(name="admin").exists()


class IsModeratorUserOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True

        # check if user is in group "moderator"
        return request.user.groups.filter(name="moderator").exists()
    
>>>>>>> 846a202fc435f045d807c57c9d7e7588e267979d
